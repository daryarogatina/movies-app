const express = require("express");
const api = require("../api/index");
const auth = require("../auth/index");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { authenticateToken } = require("../auth/authenticate-token");

router.post("/users", async (req, res) => auth.createUser(req, res));

router.post("/sessions", async (req, res) => auth.createSession(req, res));

router.post("/movies", authenticateToken, async (req, res) =>
  api.createMovie(req, res)
);

router.get("/movies", authenticateToken, async (req, res) =>
  api.showMovieList(req, res)
);

router.post("/movies/import", authenticateToken, upload.single("movies"), async (req, res) => {
    api.importMovies(req, res);
  }
);

router.get("/movies/:id", authenticateToken, async (req, res) =>
  api.showMovie(req, res)
);

router.delete("/movies/:id", authenticateToken, async (req, res) =>
  api.deleteMovie(req, res)
);

router.patch("/movies/:id", authenticateToken, async (req, res) =>
  api.updateMovie(req, res)
);

module.exports = router;
