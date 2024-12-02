import { OpenAI } from "openai";
import message from './key.json';
const CallChatGptAsync2 = async (prompt) => {
    const token = message.key;

    const client = new OpenAI({
        apiKey: token,
        dangerouslyAllowBrowser: true
    });

    const response = await client.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'gpt-4'
    });

    console.log(response.choices[0].message);
    return response.choices[0].message.content;
};

export { CallChatGptAsync2 };