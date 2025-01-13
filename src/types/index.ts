export interface ILink {
  title: string
  path: string
  icon: React.ReactNode
}
export interface ICustomers {
  _id: string
  fname: string
  lname: string
  phone_primary: string
  budget: number
  address: string
  pin: boolean
}

export interface IProduct {
  _id: string
  title: string
  createdAt: string
  category: string
  price: number
}
