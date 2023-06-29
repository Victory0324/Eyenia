const stripe = require('stripe')('sk_test_51N7uA4IXTkcX56onB8SB5NAnlxHziLWxeJ1qQium3qvkGQyTOabriHIrsm4oaE5689OinWg4BXFqgs8cjHYm4atW00DamCSZWf');
const { vehicleSchema } = require("../models");

module.exports = () => {
  const chargeMembership = async (req, res) => {
    const {
      name,
      email,
      cardName,
      cardNumber,
      cardExpMonth,
      cardExpYear,
      cardCVC,
      amount,
      deviceImei,
      expirateDate,
    } = req.body;
    
    try {

      const vehicle = await vehicleSchema.findOne({ deviceImei: deviceImei });
     
      if (vehicle) {
        //create customer
        const customer = await stripe.customers.create({
          name: name,
          email: email
        });

        //create or add a new card
        const card_Token = await stripe.tokens.create({
          card: {
            name: cardName,
            number: cardNumber,
            exp_month: cardExpMonth,
            exp_year: cardExpYear,
            cvc: cardCVC,
          },
        });

        const card = await stripe.customers.createSource(customer.id, {
          source: `${card_Token.id}`,
        });

        //charge
        const createCharge = await stripe.charges.create({
          receipt_email: email,
          amount: amount * 100,
          currency: "usd",
          card: card.id,
          customer: customer.id,
        });
        
        if(createCharge.paid){

          vehicleSchema.updateOne({ deviceImei: deviceImei}, {expirateDate: expirateDate})
          .then(result => {
            res.status(200).json({ message: "Recharge successfully."});
          })
          .catch(error =>{
            console.log(error)
            res.status(400).json({ message: "Expirate update failed."});
          })
        }
        else{
          res.status(400).json({message:"Recharge failed."});
        }
      }
      else{
        res.status(400).json({ message: "Vehicle not exist."});
      }

    } catch (err) {
      //throw new Error(err);
      res.status(401).send({ message: "Something wend wrong!" })
    }
  }

  return { chargeMembership }
}