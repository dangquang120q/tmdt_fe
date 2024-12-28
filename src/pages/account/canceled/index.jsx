import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthentication } from "store/useAuthentication";
import OrderItem from "components/pages/account/components/OrderItem";
import { Empty } from "antd";

function Canceled() {
  const user = useAuthentication();
  const [cancelled, setCancelled] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://localhost:8080/api/order/cancelled/${user.id}`)
        .then((res) => {
          setCancelled(res.data);
        });
    };
    if (user.id) {
      fetchData();
    }
  }, [user.id]);
  return (
    <div className="purchase">
      <h1>Canceled</h1>
      <div className="purchase-container">
        {cancelled.length > 0 ? (
          cancelled.map((item, id) => {
            return <OrderItem item={item} key={id} />;
          })
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </div>
    </div>
  );
}

export default Canceled;
