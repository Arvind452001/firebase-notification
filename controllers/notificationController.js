import UserToken from "../models/UserToken.js";
import Entry from "../models/Entry.js";

import admin from "../firebase.js";

// ================= SAVE TOKEN =================

export const saveToken = async (req, res) => {
  try {

    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token required",
      });
    }

    const exists = await UserToken.findOne({
      token,
    });

    if (exists) {
      return res.json({
        success: true,
        message: "Token already exists",
      });
    }

    await UserToken.create({
      token,
    });

    res.status(201).json({
      success: true,
      message: "Token saved",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to save token",
    });

  }
};

// ================= CREATE ENTRY =================

export const createEntry = async (
  req,
  res
) => {

  try {

    const {
      name,
      message,
      senderToken,
    } = req.body;

    if (!name || !message) {

      return res.status(400).json({
        success: false,
        message:
          "All fields required",
      });

    }

    // SAVE ENTRY

    const entry = await Entry.create({
      name,
      message,
    });

    // GET ALL TOKENS

    const tokensData =
      await UserToken.find();

    // REMOVE SENDER TOKEN

    const tokens = tokensData
      .map((item) => item.token)
      .filter(
        (token) =>
          token !== senderToken
      );

    console.log(tokens);

    // SEND NOTIFICATION

    if (tokens.length > 0) {

      const response =
        await admin
          .messaging()
          .sendEachForMulticast({
            tokens,
            notification: {
              title: name,
              body: message,
            },
          });

      console.log(response);

    }

    res.status(201).json({
      success: true,
      message:
        "Notification sent successfully",
      data: entry,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to create entry",
    });

  }

};