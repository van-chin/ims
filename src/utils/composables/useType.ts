// 预约类型格式化
export const useComType = (typeId: number) => {
  const types = [
    {
      value: 1,
      name: '初诊',
    },
    {
      value: 2,
      name: '复诊',
    },
  ]
  if (typeId === 1 || typeId == 2) {
    const tmp = types.find((type) => type.value === typeId)
    return tmp.name
  } else {
    return '未知'
  }
}

export const useGetBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

// 性别格式化
export const useGenderType = (id) => {
  const genders = [
    {
      value: 1,
      name: '男',
    },
    {
      value: 0,
      name: '女',
    },
    {
      value: null,
      name: '未知',
    },
    {
      value: undefined,
      name: '未知',
    },
  ]
  let tmp = genders.find((item) => item.value === id)

  if (tmp) {
    return tmp.name
  } else {
    return '未知'
  }
}

// export useGenderType;

export default useComType
