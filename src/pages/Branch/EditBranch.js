import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  useQuery,
  QueryClient,
  useQueries,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { getAllCities, editBranch } from "./branchApi";
import {
  Card,
  Input,
  Checkbox,
  Button as MTButton,
  Typography,
  Textarea,
} from "@material-tailwind/react";
import Select, { StylesConfig } from "react-select";
import * as Loader from "react-loader-spinner";
import { useForm, useController, Controller } from "react-hook-form";
import { Button } from "../../components/Button";
import { toast } from "react-toastify";
import { DevTool } from "@hookform/devtools";

const EditBranch = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const location = useLocation();
  const { fullAddress, address, id, cityId, city } = location.state;
  // console.log("EditBranch city", city);
  //--------------------------------------------------------------------------------------------
  const { data, error, isLoading, isError } = useQuery(
    ["allcities"],
    getAllCities,
    {}
  );

  let options = [];
  data?.map((el) => {
    options.push({
      value: el,
      label: el.name,
    });
  });
  options.sort((a, b) => {
    if (a.label < b.label) {
      return -1;
    } else if (a.label > b.label) {
      return 1;
    }
    return 0;
  });
  const capitalCityName = "თბილისი";
  const findCapitalCityIdx = options.findIndex(
    (el) => el.label === capitalCityName
  );
  const capitalCity = options.splice(findCapitalCityIdx, 1);
  options = capitalCity.concat(options);

  const currentCity = options.find((el) => el.value.id === cityId);
  console.log("currentCity is ", currentCity);

  const { mutateAsync, isLoading: isMutatingBranchAdd } = useMutation(
    editBranch,
    {
      onSuccess: () => {
        // queryClient.invalidateQueries(['allnews'])
        toast.success("ფილიალი წარმატებით დარედაქტირდა", {
          theme: "colored",
        });
      },
      onError: () => {
        toast.error("ფილიალის რედაქტირებისას მოხდა შეცდომა!", {
          theme: "colored",
        });
      },
    }
  );
  //--------------------------------------------------------------------------------------------

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
  } = useForm({
    defaultValues: {
      city: city.value,
      address: address,
    },
  });

  const onSubmit = async (data) => {
    await console.log("Submitted data is ", data);

    await mutateAsync({
      id: id,
      address: data.address,
      fullAddress: data.city ? `${data.city.name}, ${data.address}` : `${city.name}, ${address}`,
      cityId: data.city ? data.city.id : cityId,
    });
    //reset()
    navigate("/branchlist/");
  };

  return (
    <div className="mx-auto w-4/5 min-h-[calc(100vh-267px)]">
      <Card color="transparent" shadow={false} className="mt-2">
        <Typography variant="h4" color="blue-gray">
          ფილიალის რედაქტირება
        </Typography>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-4 mb-2 w-100 max-w-screen-lg sm:w-96"
        >
          <div className="mb-4 flex flex-col gap-6">
            <Controller
              control={control}
              name="city"
              // rules={{
              //     required: 'გთხოვთ, მიუთითოთ ქალაქი'
              // }}
              defaultValue={currentCity?.value}
              render={({
                field: { onChange, value = currentCity?.value },
                fieldState: { error },
              }) => (
                console.log("Controller value არის ", value),
                (
                  <div>
                    <Select
                      placeholder="ქალაქი"
                      options={options}
                      value={options.find((option) => option?.value === value)}
                      onChange={(option) =>
                        onChange(option ? option.value : option)
                      }
                    />
                    {error && (
                      <p className="text-red-500 font-bold">{error.message}</p>
                    )}
                  </div>
                )
              )}
            />

            <Input
              size="lg"
              label="მისამართი"
              defaultValue={address}
              className="text-[#607d8b] "
              {...register("address", {
                required: true,
              })}
            />
            {errors.address && errors.address.type === "required" && (
              <p className="text-red-500 font-bold">
                გთხოვთ, მიუთითოთ მისამართი
              </p>
            )}
          </div>

          <div>
            <Button type="submit" className="mt-6 " fullWidth>
              {isMutatingBranchAdd ? (
                <Loader.ThreeDots color="red" height={10} />
              ) : (
                "შეცვლა"
              )}
            </Button>
          </div>
        </form>

        <DevTool control={control} />
      </Card>
    </div>
  );
};

export { EditBranch };
