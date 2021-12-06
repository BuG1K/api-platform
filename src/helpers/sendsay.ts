import Sendsay from 'sendsay-api';

const sendsay = new Sendsay();

sendsay.setSessionFromCookie('sendsay_session');

class SendsayCustom {
  static sendsay = sendsay;
}

export default SendsayCustom;
