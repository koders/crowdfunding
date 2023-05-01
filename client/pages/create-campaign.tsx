import { NextPage } from "next";
import FormField from "../components/FormField";
import { useRouter } from "next/router";
import { useState } from "react";
import { useStateContext } from "../context";
import { ethers } from "ethers";
import { validateImage } from "../utils";
import { IForm } from "../types";
import Button from "../components/Button";
import { useContractWrite } from "@thirdweb-dev/react";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

interface Props {}

const CreateCampaign: NextPage<Props> = ({}) => {
  const router = useRouter();
  const { contract, address } = useStateContext();
  const { mutateAsync: createCampaign, isLoading } = useContractWrite(
    contract,
    "createCampaign"
  );
  const [form, setForm] = useState<IForm>({
    name: "",
    title: "",
    description: "",
    target: "",
    deadline: "",
    imageUrl: "",
  });

  const onFormFieldChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setForm({ ...form, [target.name]: target.value });
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const isValidImage = await validateImage(form.imageUrl);

    if (isValidImage) {
      try {
        const data = await createCampaign({
          args: [
            address,
            form.title,
            form.description,
            ethers.utils.parseUnits(form.target, 18),
            new Date(form.deadline).getTime(),
            form.imageUrl,
          ],
        });
        console.info("contract call successs", data);
        toast.success("Campaign created!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        router.push("/");
      } catch (err) {
        toast.error("Something went wrong...", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        console.error("contract call failure", err);
      }
    } else {
      alert("Provide valid image URL");
      setForm({ ...form, imageUrl: "" });
    }
  };
  return (
    <div className="flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && (
        <>
          <div className="flex items-center absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2 z-20">
            <Spinner /> Transaction in progress...
          </div>
          <div className="fixed left-0 top-0 w-full h-full backdrop-blur-sm bg-black/30 z-10"></div>
        </>
      )}
      <h1 className="text-3xl font-semibold">Start a Campaign</h1>

      <form
        onSubmit={handleSubmit}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Your Name"
            placeholder="John Doe"
            inputType="text"
            value={form.name}
            name="name"
            onChange={onFormFieldChange}
          />
          <FormField
            labelName="Campaign Title"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            name="title"
            onChange={onFormFieldChange}
          />
        </div>

        <FormField
          labelName="Story"
          placeholder="Write your story"
          isTextArea
          value={form.description}
          name="description"
          onChange={onFormFieldChange}
        />

        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Goal"
            placeholder="FTM 0.50"
            inputType="text"
            value={form.target}
            name="target"
            onChange={onFormFieldChange}
          />
          <FormField
            labelName="End Date"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            name="deadline"
            onChange={onFormFieldChange}
          />
        </div>

        <FormField
          labelName="Campaign image"
          placeholder="Place image URL of your campaign"
          inputType="url"
          value={form.imageUrl}
          name="imageUrl"
          onChange={onFormFieldChange}
        />

        <div className="flex justify-center items-center mt-[40px]">
          <Button type="submit" theme="blue">
            Create Campaign
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
