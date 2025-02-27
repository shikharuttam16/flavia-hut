import AddAddressForm from "./AddAddressForm";

const MainAddress = () => {
    return(
        <>
        <div>
            <div className="address-list">
                <p>Addresses</p>
            </div>
            <div className="add-address">
                <AddAddressForm />
            </div>
        </div>
        </>
    )
};

export default MainAddress;