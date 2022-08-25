
import dayjs from "dayjs"
// 用户格式化
export const useUserDepartments = (departments) => {
  console.log(
    "🚀 ~ file: useDataFormat.js ~ line 3 ~ useUserDepartments ~ departments",
    departments
  );
  const types = [
    {
      value: 1,
      name: "初诊",
    },
    {
      value: 2,
      name: "复诊",
    },
  ];
  let tmp = types.find((type) => type.value === typeId);

  return tmp.name;
};

// 性别格式化
export const useGenderType = (id) => {
  const genders = [
    {
      value: 1,
      name: "男",
    },
    {
      value: 0,
      name: "女",
    },
    //   {
    //     value: null,
    //     name: "未知",
    //   },
    //   {
    //     value: undefined,
    //     name: "未知",
    //   },
  ];
  let tmp = genders.find((item) => item.value === id);
  console.log("🚀 ~ file: useType.js ~ line 41 ~ useGenderType ~ tmp", tmp);

  if (tmp) {
    return tmp.name;
  } else {
    return "未知";
  }
};

export const useDateFormat = (value, format = 'YYYY-MM-DD') => {
  if (value) {
    if(value === '-') {
      return dayjs().format(format);
    } else {
      return dayjs(value).format(format);
    }

  } else {
    return "";
  }
};

