import OpenAI from 'openai'
import 'dotenv/config'

const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
})

const MODEL_NAME = 'gpt-3.5-turbo'
const SYSTEM_MESSAGE =
  'You are a song recommendation engine designed to output JSON. follow this eample {"tracks":[{"track":"Roses", "artist":"The Chainsmokers ft. ROZES"}, {}, ...]}'

async function chatCompletion(track: string, artist: string) {
  try {
    const openaiResponse = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: SYSTEM_MESSAGE,
        },
        {
          role: 'user',
          content: `i like ${track} by ${artist} sugggest 5 songs that i will like`,
        },
      ],
      model: MODEL_NAME,
      response_format: { type: 'json_object' },
    })

    return openaiResponse.choices[0].message.content
  } catch (error) {
    throw new Error(`Failed in openai function`)
  }
}

export default chatCompletion
