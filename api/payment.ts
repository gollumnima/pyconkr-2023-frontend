import { TicketType } from '@/@types';
import axios from '@/lib/axios';
import { AxiosResponse } from 'axios';

/**
 * 결제를 위한 payment_key 생성
 * payment_key는 merchant_uid로 쓰인다.
 */
export function getPaymentKey(ticketType: TicketType): Promise<string> {
  return new Promise((resolve, reject) => {
    axios
      .post<
        { msg: string; payment_key: string; price: number },
        AxiosResponse<{ msg: string; payment_key: string; price: number }>,
        { ticket_type: string }
      >(
        `/payment/key`,
        {
          ticket_type: ticketType.id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        resolve(response.data.payment_key);
      })
      .catch((e) => {
        console.error(e);
        reject(e);
      });
  });
}

/**
 * 결제 모듈의 결제 결과를 서버에 알려줌
 * @param marchantUid payment_key
 */
export function announcePaymentSucceeded(marchantUid: string): Promise<void> {
  return new Promise((resolve, reject) => {
    axios
      .post<
        { msg: string; merchant_uid: string },
        AxiosResponse<{ msg: string; merchant_uid: string }>,
        { merchant_uid: string }
      >(
        `/payment/success`,
        {
          merchant_uid: marchantUid,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        resolve();
      })
      .catch((e) => {
        console.error(e);
        reject(e);
      });
  });
}

/**
 * 결제 취소 (환불)
 * @param paymentKey payment_key
 */
export function cancelPayment(paymentKey: string): Promise<void> {
  return new Promise((resolve, reject) => {
    axios
      .post<
        { msg: string },
        AxiosResponse<{ msg: string }>,
        { payment_key: string }
      >(
        `/payment/refund`, // TODO
        {
          payment_key: paymentKey,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        resolve();
      })
      .catch((e) => {
        console.error(e);
        reject(e);
      });
  });
}
