const cookieOptions = {
  secure: true,
  maxAge: 1000 * 60 * 60 * 24 * 30,
};

const authUser = async (req, res) => {
  const user = req.user;
  try {
    const token = await user.generateToken();
    res.cookie('token', token, cookieOptions);
    res.send(
      '<script>window.opener.postMessage({ token: ' +
        JSON.stringify(token) +
        ' }, "*"); window.close();</script>'
    );
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const logOutUser = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res
        .status(500)
        .json({ success: 'false', msg: 'Could not logout user' });
    }
    res.clearCookie('token');
    return res
      .status(200)
      .json({ success: true, msg: 'User logged out successfully.' });
  });
};

const getUser = (req, res) => {
  try {
    res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    res.status(500).json({ success: false, msg: 'Some error occured' });
  }
};

module.exports = { authUser, logOutUser, getUser };
