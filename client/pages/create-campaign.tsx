import { NextPage } from "next";
import FormField from "../components/FormField";
import { useRouter } from "next/router";
import { useState } from "react";
import { useStateContext } from "../context";
import { ethers } from "ethers";
import { validateImage } from "../utils";
import { IForm } from "../types";

interface Props {}

const CreateCampaign: NextPage<Props> = ({}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { publishCampaign } = useStateContext();
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
      setIsLoading(true);
      await publishCampaign({
        ...form,
        target: "" + ethers.utils.parseUnits(form.target, 18),
      });
      setIsLoading(false);
      // router.push("/");
    } else {
      alert("Provide valid image URL");
      setForm({ ...form, imageUrl: "" });
    }
  };
  return (
    <div className="flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {/* {isLoading && <Loader />} */}
      <h1 className="text-4xl font-semibold">Start a Campaign</h1>

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
          <button
            type="submit"
            className="mr-4 h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:to-blue-600 hover:from-blue-500 text-white font-medium py-2 px-4 rounded-md transition duration-300 ease-in-out focus:shadow-[0_0_0_3px_rgba(255,255,255,.5)]"
          >
            Create Campaign
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
