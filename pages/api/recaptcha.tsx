import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

interface RecaptchaResponse {
    success: boolean;
    score: number;
    action: string;
    challenge_ts: string;
    hostname: string;
}

// const verifyRecaptcha = async (token: string): Promise<RecaptchaResponse> => {
//     const secretKey = process.env.RECAPTCHA_SECRETKEY;
//     const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

//     try {
//         const response = await axios.post(verificationUrl);
//         return response.data as RecaptchaResponse;
//     } catch (error) {
//         console.error(`reCAPTCHA verification failed: ${error}`);
//         return { success: false, score: 0, action: "", challenge_ts: "", hostname: "" };
//     }
// };

const verifyRecaptcha = async (token: string): Promise<RecaptchaResponse> => {
    const secretKey = process.env.RECAPTCHA_SECRETKEY;
    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

    try {
        const response = await fetch(verificationUrl, { method: "POST" });
        const data = await response.json();
        return data as RecaptchaResponse;
    } catch (error) {
        console.error(`reCAPTCHA verification failed: ${error}`);
        return { success: false, score: 0, action: "", challenge_ts: "", hostname: "" };
    }
};


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const token = req.body.gRecaptchaToken;

        // Verify Recaptcha response
        const response = await verifyRecaptcha(token);

        // Check if the response sent by reCaptcha is successful and the score is above 0.5
        if (response.success && response.score >= 0.5) {
            //INSERT API/LOGIC for saving data once the validation is complete
            return res.json({
                status: "success",
                message: response.score,
            });
        } else {
            return res.json({
                status: "error 2",
                message: "reCAPTCHA verification failed"
            });
        }
    } catch (error) {
        res.json({
            status: "error 1",
            message: error,
        });
    }
}
