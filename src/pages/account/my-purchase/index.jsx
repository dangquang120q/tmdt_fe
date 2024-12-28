import { Empty, Tabs } from "antd";
import OrderItem from "components/OrderItem";
import { ORDER_STATUS } from "constant";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ROUTE_URL } from "routes";
import { orderService } from "services/order";
import { Loader } from "resources/svg/Loader";
import { useAuthentication } from "store/useAuthentication";

const { TabPane } = Tabs;

const MyPurchase = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [searchParams] = useSearchParams();
  const currentQuery = searchParams.get("type");
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useAuthentication();

  const tabList = ORDER_STATUS.map((item) => ({
    label: item.value,
    key: item.id,
  }));

  const onChangeTab = (tab) => {
    setActiveTab(tab);
    navigate(ROUTE_URL.PURCHASE + `?type=${tab}`, { replace: true });
  };
  useEffect(() => {
    if (currentQuery) {
      setActiveTab(currentQuery);
      navigate(`${ROUTE_URL.PURCHASE}?type=${currentQuery}`, {
        replace: true,
      });
    } else {
      navigate(`${ROUTE_URL.PURCHASE}?type=${activeTab}`, {
        replace: true,
      });
    }
    if (id && (currentQuery == 0 || currentQuery)) {
      fetchData();
    }
  }, [currentQuery]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await orderService.getListOrder({
        customerId: id,
        status: currentQuery,
      });
      if (res.status == 200) {
        setOrders(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <div className="my-purchase">
      <Tabs activeKey={activeTab} onChange={onChangeTab}>
        {tabList.map((el) => (
          <TabPane tab={el.label} key={el.key}>
            {isLoading ? (
              <Loader />
            ) : orders.length > 0 ? (
              orders.map((order) => (
                <OrderItem order={order} fetchData={fetchData} />
              ))
            ) : (
              <Empty />
            )}
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default MyPurchase;
