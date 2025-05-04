export type Fetching = {
    products: any[]
    loading: boolean
    error: null | string
  }

export type Product = {
id:       number
title:    string
price:    number
description: string
category: string
image:    string
rating:   { rate: number; count: number }
}