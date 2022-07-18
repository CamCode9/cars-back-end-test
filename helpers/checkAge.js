exports.checkAge = async (build_date) => {
  const yearBuilt = Number(build_date.slice(0, 4));
  const regex = /\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])*/;
  const validAge = regex.test(build_date);

  if (yearBuilt >= 2018 && validAge) {
    return true;
  } else {
    return Promise.reject({ status: 400, msg: 'Invalid car age' });
  }
};
