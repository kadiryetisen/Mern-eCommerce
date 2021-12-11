const createNewAddress = async (address, user) => {
  const newAdd = {
    name: address.name,
    surname: address.surname,
    addressName: address.addressName,
    country: address.country,
    city: address.city,
    district: address.district,
    phone: address.phone,
  };

  user.shippingAddress.push(newAdd);
  const updatedUser = await user.save();
  if (updatedUser) {
    return updatedUser;
  }
  throw new Error('Address was not created');
};

module.exports = { createNewAddress };
