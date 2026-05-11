function orderPosition(course) {
  return {
    catalogItemId: course.productId,
    fieldValues: [
      {
        fieldId: -1808,
        fieldName: "Поток",
        optionName: "Без потока",
        optionValue: String(course.flowId),
        isSelected: true,
        parents: null,
        extraPay: 0,
        extraWork: 0,
        extraPayPercentage: 0,
        extraWorkPercentage: 0,
      },
    ],
    name: course.name,
    price: course.price,
    quantity: 1,
    usedCapacity: 1,
  };
}

async function graphQLRequest(query, variables) {
  const token = (process.env.SOHO_API_TOKEN_ADMIN || "").trim().replace(/\.$/, "");
  if (!token) {
    throw new Error("SOHO_API_TOKEN_ADMIN не задан в окружении");
  }

  const result = await fetch("https://api.soholms.com/master/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ query, variables }),
  });
  const data = await result.json().catch(() => ({}));
  if (!result.ok || data.errors?.length) {
    throw new Error(data.errors?.[0]?.message || `SOHO GraphQL error ${result.status}`);
  }
  return data.data;
}

async function addMasterOrder(payload) {
  const query = `
    mutation AddOrderMutation($input: AddOrderInput!) {
      addOrder(input: $input) {
        order {
          uid
          price
          paymentUrl
          transactions {
            uid
            amountPlanned
            paymentStatus
          }
          positions {
            catalogItemId
            name
            price
          }
        }
      }
    }
  `;

  const data = await graphQLRequest(query, {
    input: {
      isSupervised: false,
      dryRunByOrderId: null,
      patch: {
        clientId: payload.clientId,
        customerId: payload.customerId || payload.clientId,
        price: payload.price,
        notes: payload.comment,
        positions: payload.courses.map(orderPosition),
      },
    },
  });

  return data.addOrder.order;
}

module.exports = async (request, response) => {
  if (request.method !== "POST") {
    response.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const order = await addMasterOrder(request.body || {});
    response.status(200).json({ order });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

module.exports.addMasterOrder = addMasterOrder;
