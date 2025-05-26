import Address from "../models/Address.js";

// Add Address : /api/address/add
export const addAddress = async (req, res) => {
  try {

    const userId= req.user;
     //const  {address} = req.body.address;
     const  {address} = req.body;
      //console.log(userId); get the  userid
      //console.log(address) get the address an object formate
     await Address.create({ ...address, userId });
    res.json({ success: true, message: "Address added successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Get Address : /api/address/get
export const getAddress = async(req,res)=>{
    try {
      const userId= req.user;
      
        
        const addresses= await Address.find({userId})
        res.json({ success: true,  addresses });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
        }
}
