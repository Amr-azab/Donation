import { FC } from "react";
import { Header } from "../../components/headerDonation/HD";
import { HeaderInformation } from "../../components/headerInformation/HI";
import { LastMiddle } from "../../components/middleInformation/lastMI";

// Now you can use these components in your JSX code
export interface page {}
export const DonationInformation: FC<page> = () => {
  return (
    <div>
      <Header />
      <HeaderInformation />
      <LastMiddle />
    </div>
  );
};
