import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthentication } from "store/useAuthentication";
import OrderItem from "components/pages/account/components/OrderItem";
import { Empty } from "antd";

function Purchase() {
  const user = useAuthentication();
  const [purchase, setPurchase] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://localhost:8080/api/order/completed/${user.id}`)
        .then((res) => {
          setPurchase(res.data);
        });
    };
    if (user.id) {
      fetchData();
    }
  }, [user.id]);
  return (
    <div className="purchase">
      <h1>Purchased</h1>
      <div className="purchase-container">
        {purchase.length > 0 ? (
          purchase.map((item, id) => {
            return <OrderItem item={item} key={id} />;
          })
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </div>
    </div>
  );
}

export default Purchase;
