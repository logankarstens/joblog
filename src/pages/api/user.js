import { getSession } from "@/lib/session";

export default async function handler(req, res) {
  const session = await getSession(req, res)

  try {
    switch (req.method) {
      case "GET":
        res.status(200).json(session.user ?? null);
        break;
      case "POST":
        session.user = await JSON.parse(req.body);
        await session.save();
        res.status(200).json("");
        break;   
      default:
        res.status(500).json("Method not supported");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Error");
  }
};