import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
    console.log('Hello from express');
    res.status(200)
    res.json({ message: 'Hello from express'})
});

router.use((err, req, res, next) => {
    if (err.type === 'auth') {
      console.log(`Error: ${err.message}`);
      res.status(401);
      res.json({ message: `Error: ${err.message}` });
    } else {
      res.status(500);
      res.json({ message: `Server Error: ${err.message}` });
    }
  });

export default router;
