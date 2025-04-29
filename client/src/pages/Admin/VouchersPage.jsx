import { useState } from "react";
import PartnerList from "./PartnerList";
import VoucherList from "./VoucherList";

const VouchersPage = () => {
  const [selectedPartnerId, setSelectedPartnerId] = useState(null);

  return (
    <div className="p-6">
      {!selectedPartnerId ? (
        <PartnerList onPartnerClick={(id) => setSelectedPartnerId(id)} />
      ) : (
        <VoucherList partnerId={selectedPartnerId} onBack={() => setSelectedPartnerId(null)} />
      )}
    </div>
  );
};

export default VouchersPage;
