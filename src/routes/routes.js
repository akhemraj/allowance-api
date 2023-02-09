const express = require("express");
const { getTokenAllowances } = require("../blockchain");
const router = express.Router();

router.get("/allowances/:walletAddress", async(req, res) => {
	try {
        const walletAddress = req.params.walletAddress;
        const data = await getTokenAllowances(walletAddress);
		res.status(200).json(data);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

module.exports = router;
