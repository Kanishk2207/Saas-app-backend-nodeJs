const router = require('express').Router();
const { Snowflake } = require('@theinternetfolks/snowflake');
const Community = require('../models/communityModels');
const authMiddleware = require("../../authenticationMiddleware");
const jwsSigninToken = require("../routes/userRoutes");
//create a community
router.post('/create', authMiddleware , async(req,res)=>{


    try {
        
        //generating snowflake
        const communitySnowflake = Snowflake.generate();
        
        const user = req.user;
        
        const { communityName, slug } = req.body;
        
        const existingSlug = await Community.findOne({ slug });

        if (existingSlug) {
            return res.status(400).json({ error: 'slug already taken, please try different slug' });
        }

        const newCommunity = new Community({
            communityId: communitySnowflake,
            communityName,
            slug,
            owner: user.userId,
        });
        
        await newCommunity.save();
        res.status(200).json(newCommunity);

    } catch (error) {
        console.log(error)
        res.status(400).json({error: "bad request"});
    }

})


//get all communities
router.get('/getall', async (req,res)=>{

    console.log(jwsSigninToken);
    
    try {
        
        const allCommunities = await Community.find()
    
        res.status(200).json(allCommunities)
    } catch (error) {
        console.log(error);
        res.status(400).json({error: "internal server error"});
    }

})

//get all members
//after member router

//get my owned communities
router.get('/myOwned', authMiddleware, async(req,res)=>{
    try {
        
        const user = req.user;

        const myOwnedCommunnities = await Community.find({owner: user.userId});

        if (!myOwnedCommunnities.length) {
            return res.status(400).json({error: "No communitites found"})
        }
        
        res.status(200).json(myOwnedCommunnities);

    } catch (error) {
        
    }
})







module.exports = router;