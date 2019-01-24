export const integrationsArray = [
  {
    id: 'integration-1',
    type: 'integration',
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
    type: 'integration',
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
    type: 'integration',
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
    type: 'brand',
    name: 'Brand 1'
  },
  {
    id: 'brand-2',
    type: 'brand',
    name: 'Brand 2'
  },
  {
    id: 'brand-3',
    type: 'brand',
    name: 'Brand 3'
  },
  {
    id: 'brand-4',
    type: 'brand',
    name: 'Brand 4'
  }
]

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
    status: 'complete'
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

export const addressesArray = [
  {
    id: 'address-1',
    first_name: 'Jonathan',
    last_name: 'Steele',
    name: 'Office',
    phone_number: '(555) 555-1234',
    company_name: 'Moltin',
    line_1: 'British India House',
    line_2: '15 Carliol Square',
    city: 'Newcastle upon Tyne',
    county: 'Tyne & Wear',
    postcode: 'NE1 6UF',
    country: 'GB'
  },
  {
    id: 'address-2',
    first_name: 'Jamie',
    last_name: 'Barton',
    name: 'Office',
    phone_number: '(555) 555-1234',
    company_name: 'Moltin',
    line_1: 'British India House',
    line_2: '15 Carliol Square',
    city: 'Newcastle upon Tyne',
    county: 'Tyne & Wear',
    postcode: 'NE1 6UF',
    country: 'GB'
  }
]

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
