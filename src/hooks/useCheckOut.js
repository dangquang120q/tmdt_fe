import { useEffect, useState } from "react";
import { orderService } from "services/order";
import { useAuthentication } from "store/useAuthentication";

export const useCheckOut = () => {
  const [shipping, setShipping] = useState([]);
  const [voucher, setVoucher] = useState([]);
  const { id } = useAuthentication();
  const getShippingType = async () => {
    try {
      const res = await orderService.getShippingType();
      if (res.status == 200) {
        setShipping(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getVoucher = async () => {
    try {
      const res = await orderService.getVoucher({ customerId: id });
      if (res.status == 200) {
        setVoucher(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getShippingType();
  }, []);
  useEffect(() => {
    if (id) getVoucher();
  }, [id]);
  return {
    shipping,
    voucher,
  };
};
