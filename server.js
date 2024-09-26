const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/generate', async (req, res) => {
    const prompt = req.body.prompt;

    // Gửi yêu cầu tới API GPT-Neo
    const url = "https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-125M";
    const headers = {
        "Authorization": "Bearer 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",  // Nếu cần khóa API
        "Content-Type": "application/json"
    };
    const payload = {
        "inputs": prompt,
        "options": {"use_cache": false}
    };

    try {
        const response = await axios.post(url, payload, { headers });
        res.json(response.data);
    } catch (error) {
        res.status(500).send("Error generating text");
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
