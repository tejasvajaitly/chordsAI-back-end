import express, { Request, Response } from 'express'
import chatCompletion from './openai'
import 'dotenv/config'

const app = express()
const port = process.env.PORT

app.get(
  '/',
  async (req: Request<any, any, any, QueryParams>, res: Response) => {
    try {
      const { track, artist }: QueryParams = req.query
      if (!track || !artist) {
        return res.status(400).json({
          success: false,
          error: 'Track and artist parameters are required.',
        })
      }
      const response = await chatCompletion(track, artist)
      if (!response) {
        return res.status(400).json({
          success: false,
          error: 'No similar tracks found',
        })
      }
      const responseData = JSON.parse(response)
      res.status(200).json({ success: true, data: responseData })
    } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, error: 'Internal Server Error' })
    }
  },
)

app.listen(port, () => {
  console.log(`chordsAI-back-end listening on port ${port}`)
})

interface QueryParams {
  track: string
  artist: string
}
