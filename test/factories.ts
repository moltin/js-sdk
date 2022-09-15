import {
  CustomerAddress,
  AccountAddress,
  Brand,
  BrandBase,
  CustomAuthenticatorResponseBody,
  PromotionBase,
  FixedDiscountSchema,
  PercentDiscountSchema,
  XforYSchema,
  XforAmountSchema,
  BundleDiscountSchema,
  ItemFixedDiscountSchema,
  ItemPercentDiscountSchema,
  CurrencyAmount,
  Promotion,
  Attributes,
  PromotionCode,
  Variation,
  ModifierResponse,
  OptionResponse
} from '../src/moltin'

export const auth = (accessToken): Promise<CustomAuthenticatorResponseBody> =>
  new Promise(resolve =>
    resolve({
      expires: 99999999999,
      access_token: accessToken
    })
  )

export const integrationsArray = [
  {
    id: 'integration-1',
    type: 'integration' as const,
    name: 'Integration 1',
    description: 'Integration 1 description',
    enabled: true,
    observes: ['integrations.updated'],
    integration_type: 'webhook',
    configuration: {
      url: 'https://moltin.com/webhooktest1'
    }
  },
  {
    id: 'integration-1',
    type: 'integration' as const,
    name: 'Integration 1 Updated',
    description: 'Integration 1 updated description',
    enabled: true,
    observes: ['integrations.deleted'],
    integration_type: 'webhook',
    configuration: {
      url: 'https://moltin.com/webhooktest2'
    }
  },
  {
    id: 'integration-2',
    type: 'integration' as const,
    name: 'Integration 2',
    description: 'Integration 2 description',
    enabled: true,
    observes: ['integrations.updated'],
    integration_type: 'webhook',
    configuration: {
      url: 'https://moltin.com/webhooktest2'
    }
  }
]

export const integrationJobsArray = [
  {
    id: 'integration-job-1',
    type: 'integration-job' as const
  },
  {
    id: 'integration-job-2',
    type: 'integration-job' as const
  },
  {
    id: 'integration-job-3',
    type: 'integration-job' as const
  }
]

export const integrationLogsResponse = {
  data: [
    {
      id: 'integration-log-1',
      type: 'integration-log',
      succeeded: true,
      attempt: 1,
      processing_time: 1.4414,
      body: 'Not found',
      status_code: 200,
      error_detail: '',
      relationships: {
        integration: {
          data: {
            type: 'integration',
            id: '123'
          }
        },
        job: {
          data: {
            type: 'integration-job',
            id: 'integration-job-1'
          }
        }
      },
      meta: {
        timestamps: {
          created_at: '2022-07-11T13:12:12.223Z'
        }
      }
    }
  ],
  meta: {
    limit: 10,
    offset: 0,
    current: 1,
    total: 1
  },
  results: {
    total: 1
  }
}

export const productsArray = [
  {
    id: 'product-1',
    type: 'product',
    name: 'Product 1'
  },
  {
    id: 'product-2',
    type: 'product',
    name: 'Product 2'
  },
  {
    id: 'product-3',
    type: 'product',
    name: 'Product 3'
  },
  {
    id: 'product-4',
    type: 'product',
    name: 'Product 4'
  }
]

export const brandsArray = [
  {
    id: 'brand-1',
    type: 'brand' as const,
    name: 'Brand 1',
    slug: 'brand-1',
    description: 'Brand 1 description',
    status: 'live' as const
  },
  {
    id: 'brand-2',
    type: 'brand' as const,
    name: 'Brand 2',
    slug: 'brand-2',
    description: 'Brand 2 description',
    status: 'draft' as const
  },
  {
    id: 'brand-3',
    type: 'brand' as const,
    name: 'Brand 3',
    slug: 'brand-3',
    description: 'Brand 3 description',
    status: 'live' as const
  },
  {
    id: 'brand-4',
    type: 'brand' as const,
    name: 'Brand 4',
    slug: 'brand-4',
    description: 'Brand 4 description',
    status: 'live' as const
  }
]

export const brandUpdate = {
  name: 'New Name',
  slug: 'new-name'
}

export const categoriesArray = [
  {
    id: 'category-1',
    type: 'category',
    name: 'Category 1'
  },
  {
    id: 'category-2',
    type: 'category',
    name: 'Category 2'
  },
  {
    id: 'category-3',
    type: 'category',
    name: 'Category 3'
  },
  {
    id: 'category-4',
    type: 'category',
    name: 'Category 4'
  }
]

export const collectionsArray = [
  {
    id: 'collection-1',
    type: 'collection',
    name: 'Collection 1'
  },
  {
    id: 'collection-2',
    type: 'collection',
    name: 'Collection 2'
  },
  {
    id: 'collection-3',
    type: 'collection',
    name: 'Collection 3'
  },
  {
    id: 'collection-4',
    type: 'collection',
    name: 'Collection 4'
  }
]

export const currenciesArray = [
  {
    id: 'currency-1',
    type: 'currency',
    code: 'USD'
  },
  {
    id: 'currency-2',
    type: 'currency',
    code: 'GBP'
  },
  {
    id: 'currency-3',
    type: 'currency',
    code: 'YEN'
  },
  {
    id: 'currency-4',
    type: 'currency',
    code: 'EUR'
  }
]

export const cartItemsArray = [
  {
    id: 'cart_item-1',
    type: 'cart_item',
    name: 'Cart item 1'
  },
  {
    id: 'cart_item-2',
    type: 'cart_item',
    name: 'Cart item 2'
  },
  {
    id: 'cart_item-3',
    type: 'cart_item',
    name: 'Cart item 3'
  },
  {
    id: 'cart_item-4',
    type: 'cart_item',
    name: 'Cart item 4'
  }
]

export const customCartData = {
  image_url: 'image.link.com'
}

export const gatewaysArray = [
  {
    slug: 'braintree',
    type: 'gateway'
  },
  {
    slug: 'stripe',
    type: 'gateway'
  }
]

export const filesArray = [
  {
    id: 'file-1',
    type: 'file',
    file_name: 'File 1'
  },
  {
    id: 'file-2',
    type: 'file',
    file_name: 'File 2'
  },
  {
    id: 'file-3',
    type: 'file',
    file_name: 'File 3'
  },
  {
    id: 'file-4',
    type: 'file',
    file_name: 'File 4'
  }
]

export const ordersArray = [
  {
    id: 'order-1',
    type: 'order',
    status: 'complete',
    relationships: {
      account: {
        data: {
          type: 'account',
          id: '1c45e4ec-26e0-4043-86e4-c15b9cf985a1'
        }
      },
      account_member: {
        data: {
          type: 'account_member',
          id: '7c45e4ec-26e0-4043-86e4-c15b9cf985a1'
        }
      }
    },
    included: {
      accounts: [
        {
          type: 'account',
          id: '1c45e4ec-26e0-4043-86e4-c15b9cf985a1',
          legal_name: 'my legal name',
          name: 'my name'
        }
      ],
      account_members: [
        {
          type: 'account_member',
          id: '7c45e4ec-26e0-4043-86e4-c15b9cf985a1',
          email: 'test@ep.com',
          name: 'test account'
        }
      ]
    }
  },
  {
    id: 'order-2',
    type: 'order',
    status: 'incomplete'
  },
  {
    id: 'order-3',
    type: 'order',
    status: 'complete'
  },
  {
    id: 'order-4',
    type: 'order',
    status: 'cancelled'
  }
]

export const orderItemsArray = [
  {
    id: 'item-1',
    type: 'order_item',
    quantity: 2,
    product_id: 'product-1'
  },
  {
    id: 'item-2',
    type: 'order_item',
    quantity: 1,
    product_id: 'product-2'
  }
]

export const orderTransactionsArray = [
  {
    id: 'transaction-1',
    type: 'transaction',
    reference: 'ch_1AzkYiFnpfya5sMz8gVp6Ds6',
    gateway: 'stripe',
    amount: 159800,
    currency: 'NOK',
    'transaction-type': 'purchase',
    status: 'complete',
    relationships: {
      order: {
        data: {
          type: 'order',
          id: 'c5530906-7b68-42ee-99c3-68cfebdcd749'
        }
      }
    }
  },
  {
    id: 'transaction-2',
    type: 'transaction',
    reference: 'ch_1AzkYiFnpfya5sMz8gVp6Ds6',
    gateway: 'stripe',
    amount: 159800,
    currency: 'NOK',
    'transaction-type': 'purchase',
    status: 'complete',
    relationships: {
      order: {
        data: {
          type: 'order',
          id: 'c5530906-7b68-42ee-99c3-68cfebdcd749'
        }
      }
    }
  }
]

export const customersArray = [
  {
    id: 'customer-1',
    type: 'customer',
    username: 'test-user',
    name: 'test-user',
    email: 'testuser@test.com',
    password: 'securepassword',
    token: 'eyAgICJhbGciOiAiSFMyNTYiLCAgICJ0'
  },
  {
    id: 'customer-2',
    type: 'customer',
    username: 'test-user2',
    name: 'test-user2',
    email: 'testuser2@test.com',
    password: 'securepassword',
    token: 'eXAiOiAiSldUIiB9.eyJzdWIiOiI0YzY'
  }
]

export const inventoriesArray = [
  {
    id: 'inventory-1',
    type: 'stock',
    total: 10,
    available: 10,
    allocated: 0
  },
  {
    id: 'inventory-2',
    type: 'stock',
    total: 20,
    available: 20,
    allocated: 0
  }
]

export const stockTransactionsArray = [
  {
    id: 'stock-transaction-1',
    product_id: 'managed-product-1',
    quantity: 1
  },
  {
    id: 'stock-transaction-2',
    product_id: 'managed-product-2',
    quantity: 2
  }
]

export const flowsArray = [
  {
    id: 'flow-1',
    type: 'flow',
    name: 'Flow 1',
    slug: 'flow-1'
  },
  {
    id: 'flow-2',
    type: 'flow',
    name: 'Flow 2',
    slug: 'flow-2'
  }
]

export const flowEntriesArray = [
  {
    id: 'flow-entry-1',
    type: 'entry',
    name: 'Flow Entry 1'
  },
  {
    id: 'flow-entry-2',
    type: 'entry',
    name: 'Flow Entry 2'
  }
]

export const customerAddressesArray: CustomerAddress[] = [
  {
    type: 'customer-address' as const,
    id: 'address-1',
    first_name: 'Jonathan',
    last_name: 'Steele',
    name: 'Office',
    phone_number: '(555) 555-1234',
    instructions: 'Instruction 1',
    company_name: 'Moltin',
    line_1: 'British India House',
    line_2: '15 Carliol Square',
    city: 'Newcastle upon Tyne',
    county: 'Tyne & Wear',
    postcode: 'NE1 6UF',
    country: 'GB'
  },
  {
    type: 'customer-address' as const,
    id: 'address-2',
    first_name: 'Jamie',
    last_name: 'Barton',
    name: 'Office',
    phone_number: '(555) 555-1234',
    instructions: 'Instruction 2',
    company_name: 'Moltin',
    line_1: 'British India House',
    line_2: '15 Carliol Square',
    city: 'Newcastle upon Tyne',
    county: 'Tyne & Wear',
    postcode: 'NE1 6UF',
    country: 'GB'
  }
]

export const accountAddressesArray: AccountAddress[] = [
  {
    type: 'account-address' as const,
    id: 'address-1',
    first_name: 'Jonathan',
    last_name: 'Steele',
    name: 'Office',
    phone_number: '(555) 555-1234',
    instructions: 'Instruction 1',
    company_name: 'Moltin',
    line_1: 'British India House',
    line_2: '15 Carliol Square',
    city: 'Newcastle upon Tyne',
    county: 'Tyne & Wear',
    postcode: 'NE1 6UF',
    country: 'GB'
  },
  {
    type: 'account-address' as const,
    id: 'address-2',
    first_name: 'Jamie',
    last_name: 'Barton',
    name: 'Office',
    phone_number: '(555) 555-1234',
    instructions: 'Instruction 2',
    company_name: 'Moltin',
    line_1: 'British India House',
    line_2: '15 Carliol Square',
    city: 'Newcastle upon Tyne',
    county: 'Tyne & Wear',
    postcode: 'NE1 6UF',
    country: 'GB'
  }
]

export const addressUpdate = {
  last_name: 'last_name_2',
  city: 'city_2'
}

export const jobsArray = [
  {
    id: 'job-1',
    type: 'job',
    job_type: 'order_export',
    status: 'complete'
  },
  {
    id: 'job-2',
    type: 'job',
    job_type: 'order_export',
    status: 'pending'
  },
  {
    id: 'job-3',
    type: 'job',
    job_type: 'order_export',
    status: 'processing'
  }
]

export const rateLimitError = {
  errors: [
    {
      status: 429
    }
  ]
}

export const notFoundError = {
  errors: [
    {
      status: 404,
      detail: 'The requested product could not be found',
      title: 'Product not found'
    }
  ]
}

export const promotionsArray: Promotion[] = [
  {
    type: 'promotion',
    id: 'promotion-1',
    name: 'promotion-1',
    description: 'promotion-1',
    enabled: true,
    promotion_type: 'x_for_amount',
    min_cart_value: [
      {
        currency: 'USD',
        amount: 1233
      }
    ],
    max_discount_value: [
      {
        currency: 'USD',
        amount: 2211
      }
    ],
    schema: {
      x: 6,
      currencies: [
        {
          currency: 'USD',
          amount: 2200
        }
      ],
      targets: ['product_one']
    },
    start: '2012-12-12T12:12:00Z',
    end: '2023-12-12T12:12:00Z',
    meta: {
      timestamps: {
        created_at: '2020-10-27T11:51:53.872Z',
        updated_at: '2020-10-27T11:51:53.872Z'
      }
    }
  },
  {
    type: 'promotion',
    id: 'promotion-2',
    name: 'promotion-2',
    description: 'promotion-2',
    enabled: true,
    promotion_type: 'fixed_discount',
    schema: {
      currencies: [
        {
          currency: 'USD',
          amount: 111
        }
      ]
    },
    start: '2020-01-01T04:00:00Z',
    end: '2020-11-01T04:00:00Z',
    meta: {
      timestamps: {
        created_at: '2020-04-06T08:33:10.366Z',
        updated_at: '2020-10-27T10:06:34.787Z'
      }
    }
  }
]

export const promotionCodesArray: PromotionCode[] = [
  { code: 'auto_c55a8d1f-ac44-4e7c-ab82-f41b77783ebb' },
  { code: 'EZQQNO' }
]

export const attributeResponse: Attributes = {
  data: [
    {
      label: 'Attribute 1',
      value: 'attribute_1',
      type: 'string',
      required: false,
      description: 'Attribute 1'
    },
    {
      label: 'Attribute 2',
      value: 'attribute_2',
      type: 'string',
      required: false,
      description: 'Attribute 2'
    },
    {
      label: 'Attribute 3',
      value: 'attribute_3',
      type: 'enum',
      required: false,
      description: 'Attribute 3',
      options: ['AX', 'AL']
    }
  ],
  meta: {
    entity: 'address',
    version: '2.0.0'
  }
}

export const variationsArray: Variation[] = [
  {
    type: 'product-variation',
    id: 'variation-1',
    name: 'Color',
    options: [
      {
        id: 'option-1',
        name: 'Blue',
        description: 'Blue',
        modifiers: [
          {
            id: 'modifier-1',
            type: 'name_append',
            value: 'Blue'
          },
          {
            id: 'modifier-2',
            type: 'sku_append',
            value: 'blue'
          },
          {
            id: 'modifier-3',
            type: 'slug_append',
            value: 'blue'
          }
        ]
      },
      {
        id: 'option-2',
        name: 'White',
        description: 'White',
        modifiers: [
          {
            id: 'modifier-1',
            type: 'name_append',
            value: 'White'
          },
          {
            id: 'modifier-2',
            type: 'sku_append',
            value: 'white'
          },
          {
            id: 'modifier-3',
            type: 'slug_append',
            value: 'white'
          }
        ]
      }
    ],
    relationships: {
      options: {
        data: [
          {
            type: 'option',
            id: 'option-1'
          },
          {
            type: 'option',
            id: 'option-2'
          }
        ]
      }
    }
  },
  {
    type: 'product-variation',
    id: 'variation-2',
    name: 'Fixture Finish',
    options: [
      {
        id: 'option-1',
        name: 'Antique Bronze',
        description: 'Antique Bronze',
        modifiers: [
          {
            id: 'modifier-1',
            type: 'sku_builder',
            value: {
              seek: 'COLOR',
              set: 'AB'
            }
          },
          {
            id: 'modifier-2',
            type: 'slug_builder',
            value: {
              seek: 'COLOR',
              set: 'antique-bronze'
            }
          },
          {
            id: 'modifier-3',
            type: 'name_append',
            value: ' Antique Bronze'
          }
        ]
      },
      {
        id: 'option-2',
        name: 'Brushed Nickel',
        description: 'Brushed Nickel',
        modifiers: [
          {
            id: 'modifier-1',
            type: 'sku_builder',
            value: {
              seek: 'COLOR',
              set: 'BN'
            }
          },
          {
            id: 'modifier-2',
            type: 'slug_builder',
            value: {
              seek: 'COLOR',
              set: 'brushed-nickel'
            }
          },
          {
            id: 'modifier-3',
            type: 'name_append',
            value: ' Brushed Nickel'
          }
        ]
      }
    ],
    relationships: {
      options: {
        data: [
          {
            type: 'option',
            id: 'option-1'
          },
          {
            type: 'option',
            id: 'option-2'
          }
        ]
      }
    }
  }
]

export const optionsArray: OptionResponse[] = [
  {
    type: 'option',
    id: 'option-1',
    name: 'Blue',
    description: 'Blue color',
    relationships: {
      modifiers: {
        data: [
          {
            name_append: 'Blue'
          },
          {
            sku_append: 'blue'
          },
          {
            slug_append: 'blue'
          },
          {
            price_increment: [
              {
                amount: 300,
                currency: 'USD',
                includes_tax: true
              }
            ]
          }
        ]
      }
    }
  },
  {
    type: 'option',
    id: 'option-2',
    name: 'White',
    description: 'White',
    relationships: {
      modifiers: {
        data: [
          {
            name_append: 'White'
          },
          {
            sku_append: 'white'
          },
          {
            slug_append: 'white'
          },
          {
            price_equals: [
              {
                amount: 20000,
                currency: 'USD',
                includes_tax: true
              }
            ]
          }
        ]
      }
    }
  }
]

export const modifiersArray: ModifierResponse[] = [
  {
    type: 'modifier',
    id: 'modifier-1',
    modifier_type: 'name_append',
    value: 'White'
  },
  {
    type: 'modifier',
    id: 'modifier-2',
    modifier_type: 'price_equals',
    value: [
      {
        amount: 20000,
        currency: 'USD',
        includes_tax: true
      }
    ]
  },
  {
    type: 'modifier',
    id: 'modifier-2',
    modifier_type: 'sku_builder',
    value: {
      seek: 'color',
      set: 'white'
    }
  }
]

export const accountMembershipsArray = [
  {
    id: 'b7a4b745-094d-42cd-bd52-99dd5e411d4b',
    type: 'account_membership',
    meta: {
      timestamps: {
        created_at: '2021-03-31T15:54:12.883Z',
        updated_at: '2021-03-31T15:54:12.883Z'
      }
    },
    relationships: {
      account_member: {
        data: {
          id: '69a1c07b-b9b8-4a9f-b91c-d613bb260fc3',
          type: 'account_member'
        }
      }
    }
  },
  {
    id: '707dceba-5d76-4e87-a025-c1416eac6367',
    type: 'account_membership',
    meta: {
      timestamps: {
        created_at: '2021-03-31T15:54:12.883Z',
        updated_at: '2021-03-31T15:54:12.883Z'
      }
    },
    relationships: {
      account_member: {
        data: {
          id: 'ff061d14-c8f4-4c56-b6f7-9f3582fb29b2',
          type: 'account_member'
        }
      }
    }
  },
  {
    id: '2c45e4ec-26e0-4043-86e4-c15b9cf985a3',
    type: 'account_membership',
    meta: {
      timestamps: {
        created_at: '2021-03-31T15:54:12.883Z',
        updated_at: '2021-03-31T15:54:12.883Z'
      }
    },
    relationships: {
      account_member: {
        data: {
          id: '3221552e-73ae-4ce3-b8a2-db3d8e033e9e',
          type: 'account_member'
        }
      }
    }
  }
]

export const applicationKeysArray = [
  {
    id: 'a29a3ee0-afcc-400a-a675-9d7471a4a169',
    name: 'application-key-1',
    type: 'application_key',
    client_id: '69e4c1d553f9a52d60579b08527d50ac13cd04bc04',
    meta: {
      timestamps: {
        created_at: '2022-09-13T18:34:04.748025Z',
        updated_at: '2022-09-13T18:34:04.748025Z'
      }
    }
  },
  {
    id: '1be17a02-ffae-4175-a237-8e7ea08a408c',
    name: 'application-key-2',
    type: 'application_key',
    client_id: 'f338175816c2c773217785d22252b02f3902477c17',
    meta: {
      timestamps: {
        created_at: '2022-09-13T18:34:04.748025Z',
        updated_at: '2022-09-13T18:34:04.748025Z'
      }
    }
  },
  {
    id: 'bfb507c9-e750-47a1-89e1-ae6fae819b27',
    name: 'application-key-3',
    type: 'application_key',
    client_id: '574407e5abe019393b9d5c52900e0457690ebb490b',
    meta: {
      timestamps: {
        created_at: '2022-09-13T18:34:04.748025Z',
        updated_at: '2022-09-13T18:34:04.748025Z'
      }
    }
  },
  {
    id: '9f7de086-76bd-4f30-925c-1b298c476274',
    name: 'application-key-4',
    type: 'application_key',
    client_id: '1efa47fed0b4688861ce31e00ba6ebc0a143dcbfe4',
    meta: {
      timestamps: {
        created_at: '2022-09-13T18:34:04.748025Z',
        updated_at: '2022-09-13T18:34:04.748025Z'
      }
    }
  }
]
