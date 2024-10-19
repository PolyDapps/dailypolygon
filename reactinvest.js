import { prepareContractCall } from "thirdweb"
import { useSendTransaction } from "thirdweb/react";

export default function Component() {
  const { mutate: sendTransaction } = useSendTransaction();

  const onClick = () => {
    const transaction = prepareContractCall({
      contract,
      method: "function invest(address referrer) payable",
      params: [referrer]
    });
    sendTransaction(transaction);
  }
}
