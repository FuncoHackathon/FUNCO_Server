import User from "../models/User.js";

export const postJoin = async (req, res) => {
  const { email, password, password2, name } = req.body;
  const passwordRules = /^[a-zA-Z0-9]{6,15}$/;
  if (passwordRules.test(password) === false) {
    return res.status(400).json({
      status: 400,
      message: "숫자와 영문자 조합으로 6~15자리를 사용하여 주세요.",
    });
  }
  try {
    const emailExists = await User.exists({ email });
    if (!emailExists) {
      return res.status(400).json({
        status: 400,
        message: "이 email은 이미 사용되고 있습니다. 다른 email로 바꿔주세요.",
      });
    }
    if (password !== password2) {
      return res.status(400).json({
        status: 400,
        message: "password 확인이 같지 않습니다.",
      });
    }
    await User.create({
      email,
      password,
      name,
    });
    return res.status(200).json({
      status: 200,
      message: "회원가입에 성공하였습니다. 로그인해주세요.",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "회원가입에 실패하였습니다. 다시 시도해주세요.",
    });
  }
};
