// import axios from "axios";
// import type { NextApiRequest, NextApiResponse } from "next";

// const verifyRecaptcha = async (token: string) => {
//     const secretKey = process.env.RECAPTCHA_SECRETKEY;

//     const verificationUrl =
//         `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

//     return await axios.post(verificationUrl)
// };

// export default async function handler(
//     req: NextApiRequest,
//     res: NextApiResponse<any>
// ) {
//     try {
//         const token = req.body.gRecaptchaToken;

//         // Recaptcha response
//         const response = await verifyRecaptcha(token);

//         // Checking if the reponse sent by reCaptcha success or not and if the score is above 0.5
//         // In ReCaptcha v3, a score sent which tells if the data sent from front end is from Human or from Bots. If score above 0.5 then it is human otherwise it is bot
//         // For more info check, https://developers.google.com/recaptcha/docs/v3
//         // ReCaptcha v3 response, {
//         //     "success": true|false,      // whether this request was a valid reCAPTCHA token for your site
//         //     "score": number             // the score for this request (0.0 - 1.0)
//         //     "action": string            // the action name for this request (important to verify)
//         //     "challenge_ts": timestamp,  // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
//         //     "hostname": string,         // the hostname of the site where the reCAPTCHA was solved
//         //     "error-codes": [...]        // optional
//         //   }

//         if (response.data.success && response.data.score >= 0.5) {
//             //INSERT API/LOGIC for saving data once the validation is complete
//             return res.json({
//                 status: "success",
//                 message: response.data.score,
//             });
//         } else {
//             return res.json({
//                 status: "error 2",
//                 message: { token, response },
//             });
//         }
//     } catch (error) {
//         res.json({
//             status: "error 1",
//             message: error,
//         });
//     }
// }


import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

interface RecaptchaResponse {
    success: boolean;
    score: number;
    action: string;
    challenge_ts: string;
    hostname: string;
}

const verifyRecaptcha = async (token: string): Promise<RecaptchaResponse> => {
    const secretKey = process.env.RECAPTCHA_SECRETKEY;
    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

    try {
        const response = await axios.post(verificationUrl);
        return response.data as RecaptchaResponse;
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
                message: { token, response },
            });
        }
    } catch (error) {
        res.json({
            status: "error 1",
            message: error,
        });
    }
}
