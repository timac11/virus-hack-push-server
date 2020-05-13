import axios from 'axios'
import NodeDatabase from '../database/NodeDatabase'

export class PushService {
  public static run (db: NodeDatabase) {
    setInterval(() => {
      axios.post('https://fcm.googleapis.com/fcm/send', {
        data: {
          title: 'Прием пищи',
          body: 'Потапову Е. И. необходимо принять пищу через 5 минут',
          icon: 'https://files.fm/thumb_show.php?i=qrecddpd',
          click_action: 'http://35.222.222.35/procedure/17'
        },
        to: 'ewbwmDF0QVhP4d2OXf5tTA:APA91bFMVR6QsOwymno3K5RQwFHzleBm1T5xDjaBubpX1q8VDbpkEIRHDOmS6-MjBCXcrdBanWZg5bTvfpx2XFn4EhEyFexT9ad2aiQdM6Y_SmEuXmn6-4ENQDx2o9Egas5TRdFn3od3'
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'key=AAAAZF1KD-Y:APA91bEU_yatV9BFI7G2LrU17KpkzccCx7n-SSQA6e7OsdS0HJ7j8zWaXtBF-fBsZ5Z_JdhVotxUnqznFlk7y9mucI3YmSpaQ5uhrJMjhVwzfh3ttW4y8x6UGMdYphBMqRrwhvcTDGKL'
        }
      }).then((result) => console.log(result))
    }, 3000000)
  }
}
