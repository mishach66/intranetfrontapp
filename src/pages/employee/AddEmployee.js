import React, { useState } from "react";
import {
  useQuery,
  QueryClient,
  useQueries,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  Card,
  Input,
  Checkbox,
  Button as MTButton,
  Typography,
  Textarea,
} from "@material-tailwind/react";
import * as Loader from "react-loader-spinner";
import { useForm, useController } from "react-hook-form";
import { Button } from "../../components/Button";
import { getBranchList } from "../Branch/branchApi";
import Select, { StylesConfig } from "react-select";
import { createEmployee, getLanguages } from "../../api/employeeapi";
import { toast } from "react-toastify";

export const AddEmployee = () => {
  const initialFileValues = {
    imageName: "",
    imageSrc: null,
    imageFileSet: null,
  };
  const [file, setFile] = useState(initialFileValues);

  const [selectedLanguageOptions, setSelectedLanguageOptions] = useState();

  var selectedLanguageOptionsIds = selectedLanguageOptions?.map((item) => 
    item.value.id
  );

  const setImage = (e) => {
    console.log(e.target.files[0]);
    if (e.target.files && e.target.files[0]) {
      let imageFileSet = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        console.log(x.target.result);
        setFile({
          ...file,
          imageFileSet,
          imageSrc: x.target.result,
        });
      };
      reader.readAsDataURL(imageFileSet);
      // The readAsDataURL method is used to read the contents of the specified Blob or File.
      // When the read operation is finished, the readyState becomes DONE, and the loadend is triggered.
      // At that time, the result attribute contains the data as a data: URL representing the file's data as a base64 encoded string.
    } else {
      setFile({
        ...file,
        imageFileSet: null,
        imageSrc: null,
      });
    }
  };

  const {
    data: branchListData,
    error,
    isLoading,
    isError,
  } = useQuery(["branchesWithoutPaging"], getBranchList, {});
  //console.log("branchListData", branchListData.branches[0].fullAddress);
  //console.log("branchListData", branchListData);

  const options = [];
  branchListData?.branches.map((el) => {
    options.push({
      value: el,
      label: el.fullAddress,
    });
  });
  //console.log("options", options);

  const {
    data: languagesData,
    error: languagesError,
    isLoading: languagesIsLoading,
    isError: languagesIsError,
  } = useQuery(["languagesQuery"], getLanguages, {});
  console.log("languagesData", languagesData);

  const languagesOptions = [];
  languagesData?.map((el) => {
    languagesOptions.push({
      value: el,
      label: el.languageName,
    });
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();

  const { field } = useController({ name: "branch", control });
  const {
    value: branchValue,
    onChange: branchOnChange,
    ...restBranchField
  } = field;

  const { field: languageField } = useController({ name: "language", control });
  const {
    value: languageValue,
    onChange: languageOnChange,
    ...restLanguageField
  } = languageField;

  const { mutateAsync, isLoading: isMutatingEmployeeAdd } = useMutation(
    createEmployee,
    {
      onSuccess: (response) => {
        console.log("Mutation Success", response);
        // queryClient.invalidateQueries(['suitableQueryKey'])
        toast.success("თანამშრომელი წარმატებით დაემატა", {
          theme: "colored",
        });
      },
      onError: (error) => {
        console.log("Mutation Error", error);
        toast.error("თანამშრომლის დამატებისას მოხდა შეცდომა!", {
          theme: "colored",
        });
      },
    }
  );

  const formData = new FormData();
  const onSubmit = async (data) => {

    formData.append("givenname", data.givenname);
    formData.append("surname", data.surname);
    formData.append("idNumber", data.idnumber);
    formData.append("dateOfBirth", data.dateofbirth);
    formData.append("department", data.department);
    formData.append("position", data.position);
    formData.append("email", data.email);
    formData.append("mobilePhone", data.mobilephone);
    formData.append("workPhone", data.workphone);
    formData.append("LanguageСlassifiersIds", selectedLanguageOptionsIds);
    formData.append("additionalInfo", data.additionalinfo);
    formData.append("branchId", data.branch.id);
    formData.append("cityId", data.branch.cityId);
    formData.append("imageFile", file.imageFileSet);

    const empl = {
      Givenname: formData.get("givenname"),
      Surname: formData.get("surname"),
      IdNumber: formData.get("idNumber"),
      DateOfBirth: formData.get("dateOfBirth"),
      Department: formData.get("department"),
      Position: formData.get("position"),
      Email: formData.get("email"),
      MobilePhone: formData.get("mobilePhone"),
      WorkPhone: formData.get("workPhone"),
      AdditionalInfo: formData.get("additionalInfo"),
      BranchId: formData.get("branchId"),
      CityId: formData.get("cityId"),
      LanguageСlassifiersIds: selectedLanguageOptionsIds,
      ImageFile: formData.get("imageFile"),
    };

    await mutateAsync({
      //formData,
      empl,
    });
    reset();
    setFile(initialFileValues);
    setSelectedLanguageOptions([]);
    //navigate('/')
  };

  return (
    <>
      <div className="mx-auto w-4/5 min-h-[calc(100vh-267px)]">
        <Card color="transparent" shadow={false} className="mt-2">
          <Typography variant="h4" color="blue-gray">
            თანამშრომლის დამატება
          </Typography>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-4 mb-2 w-100 max-w-screen-lg sm:w-96"
          >
            <div className="mb-4 flex flex-col gap-6">
              <Input
                size="lg"
                label="სახელი *"
                className="text-[#607d8b] "
                {...register("givenname", {
                  required: true,
                })}
              />
              {errors.givenname && errors.givenname.type === "required" && (
                <p className="text-red-500 font-bold">
                  გთხოვთ, მიუთითოთ სახელი
                </p>
              )}

              <Input
                size="lg"
                label="გვარი *"
                className="text-[#607d8b] "
                {...register("surname", {
                  required: true,
                })}
              />

              <Input
                size="lg"
                label="პირადი ნომერი *"
                className="text-[#607d8b] "
                {...register("idnumber", {
                  required: true,
                })}
              />

              <Input
                size="lg"
                label="დაბადების თარიღი *"
                className="text-[#607d8b] "
                {...register("dateofbirth", {
                  required: true,
                })}
                type="date"
              />

              <Input
                size="lg"
                label="განყოფილება *"
                className="text-[#607d8b] "
                {...register("department", {
                  required: true,
                })}
              />

              <Input
                size="lg"
                label="პოზიცია *"
                className="text-[#607d8b] "
                {...register("position", {
                  required: true,
                })}
              />

              <Input
                size="lg"
                label="ელ. ფოსტა"
                className="text-[#607d8b] "
                {...register("email", {
                  required: true,
                })}
              />

              <Input
                size="lg"
                label="მობილური *"
                className="text-[#607d8b] "
                {...register("mobilephone", {
                  required: true,
                })}
              />

              <Input
                size="lg"
                label="შიდა ნომერი *"
                className="text-[#607d8b] "
                {...register("workphone", {
                  required: true,
                })}
              />

              {/* ---------------- ფილიალი ------------- */}

              <Select
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: "#dee2e6",
                    height: "2.75rem",
                    borderRadius: 5,
                    "&:hover": {
                      borderColor: "none",
                    },
                  }),
                  option: (
                    styles,
                    { data, isDisabled, isFocused, isSelected }
                  ) => {
                    return {
                      ...styles,
                      color: "#607d8b",
                    };
                  },
                  singleValue: (defaultStyles) => ({
                    ...defaultStyles,
                    color: "#607d8b",
                  }),
                  placeholder: (defaultStyles) => ({
                    ...defaultStyles,
                    color: "#607d8b",
                  }),
                }}
                className="select-input text-sm text-[#455a64] "
                {...register("branch", {
                  required: true,
                })}
                placeholder="ფილიალი *"
                isClearable
                isSearchable
                options={options}
                value={
                  branchValue
                    ? options.find((x) => x.value === branchValue)
                    : null
                }
                defaultValue={options[0]}
                // required
                onChange={(option) =>
                  branchOnChange(option ? option.value : option)
                }
                {...restBranchField}
              />

              {/* ---------------- ფილიალი ------------- */}

              {/* ---------------- ენები ------------- */}
              {/* <Input
                size="lg"
                label="ენები *"
                className="text-[#607d8b] "
                {...register("language", {
                  required: true,
                })}
              /> */}

              <Select
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: "#dee2e6",
                    height: "2.75rem",
                    borderRadius: 5,
                    "&:hover": {
                      borderColor: "none",
                    },
                  }),
                  option: (
                    styles,
                    { data, isDisabled, isFocused, isSelected }
                  ) => {
                    return {
                      ...styles,
                      color: "#607d8b",
                    };
                  },
                  singleValue: (defaultStyles) => ({
                    ...defaultStyles,
                    color: "#607d8b",
                  }),
                  placeholder: (defaultStyles) => ({
                    ...defaultStyles,
                    color: "#607d8b",
                  }),
                }}
                className="select-input text-sm text-[#455a64] "
                {...register("language", {
                  // required: true,
                })}
                placeholder="ენები *"
                isMulti
                isClearable
                isSearchable={true}
                options={languagesOptions}
                // value={
                //   branchValue
                //     ? options.find((x) => x.value === branchValue)
                //     : null
                // }

                value={selectedLanguageOptions}
                //defaultValue={languagesOptions[2]}
                // required
                onChange={(options) =>
                  languageOnChange(setSelectedLanguageOptions(options))
                }
                {...restLanguageField}
              />
              {/* ---------------- ენები ------------- */}

              {/* ---------------- ფოტო ------------- */}
              <div className="flex items-center h-20">
                <div className="flex w-4/12 h-8 justify-center items-center text-sm mx-2 my-3 bg-inherit border-[#f56a6a] border-[1px] rounded-xl hover:text-lg hover:font-semibold hover:bg-[#f57272] hover:text-sm hover:text-white">
                  <label className="" htmlFor="file_input">
                    ფოტოს ატვირთვა
                  </label>
                </div>

                <input
                  className="hidden"
                  id="file_input"
                  type="file"
                  name="imageFile"
                  accept="image/png, image/jpeg"
                  // onChange={(e) => setFile(e.target.files[0])}
                  onChange={setImage}
                />

                <div className=" flex justify-center items-center mx-2 my-3">
                  {file.imageFileSet ? (
                    <>
                      <div>
                        <img
                          src={file.imageSrc}
                          alt="Employee image"
                          width="72"
                          height="auto"
                        />
                      </div>
                      <div className="ml-8">
                        <p className="justify-center items-center text-sm text-gray-600">
                          ფაილი: <strong>{file.imageFileSet.name}</strong>
                        </p>
                      </div>
                    </>
                  ) : (
                    <p className="justify-center items-center text-sm text-gray-500">
                      გთხოვთ, აირჩიოთ ფოტო
                    </p>
                  )}
                </div>
              </div>
              {/* ---------------- ფოტო ------------- */}

              <Textarea
                label="დამატებითი ინფორმაცია"
                rows={12}
                {...register("additionalinfo")}
              ></Textarea>
            </div>

            <div>
              <Button type="submit" className="mt-6 " fullWidth>
                {false ? (
                  <Loader.ThreeDots color="red" height={10} />
                ) : (
                  "დამატება"
                )}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
};
