import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const postJoin = async (req, res) => {
  const { email, password, password2, name } = req.body;
  const passwordRules = /^[a-zA-Z0-9]{6,15}$/;
  if (!passwordRules.test(password)) {
    return res.status(400).json({
      status: 400,
      message: "숫자와 영문자 조합으로 6~15자리를 사용하여 주세요.",
    });
  }
  try {
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
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: "회원가입에 실패하였습니다. 다시 시도해주세요.",
    });
  }
};

export const getEmailCheck = async (req, res) => {
  const email = req.params.id;
  try {
    const emailExists = await User.exists({ email });
    if (emailExists) {
      return res.status(400).json({
        status: 400,
        message:
          "이 이메일은 이미 사용되고 있습니다. 다른 이메일로 바꿔주세요.",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "이메일 사용이 가능합니다.",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "이메일 체크에 실패하였습니다. 다시 시도해주세요.",
    });
  }
};

export const postLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const emailExists = await User.exists({ email });
    if (!emailExists) {
      res.status(400).json({
        status: 400,
        message:
          "이 이메일을 가진 계정이 없습니다. 다시 이메일을 확인해주세요.",
      });
    }
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(400).json({
        status: 400,
        error: "비밀번호가 옳지 않습니다.",
      });
    }
    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        name: user.name,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "10000m",
        issuer: "funco",
      }
    );
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "로그인에 실패하였습니다. 다시 시도해주세요.",
    });
  }
};

export const getName = async (req, res) => {
  const { name } = req.user;
  res.status(200).json({
    name,
  });
};
