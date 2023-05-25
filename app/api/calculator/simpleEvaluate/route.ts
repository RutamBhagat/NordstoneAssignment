import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  let { equation } = body;

  const [num1, operator, num2] = equation.split(/\s*([\+\-\*\/\**])\s*/);

  try {
    let evaluation = "NaN";

    switch (operator) {
      case "+":
        evaluation = String(parseFloat(num1) + parseFloat(num2));
        break;
      case "-":
        evaluation = String(parseFloat(num1) - parseFloat(num2));
        break;
      case "*":
        evaluation = String(parseFloat(num1) * parseFloat(num2));
        break;
      case "/":
        evaluation = String(parseFloat(num1) / parseFloat(num2));
        break;
      case "**":
        evaluation = String(parseFloat(num1) ** parseFloat(num2));
        break;
      default:
        evaluation = "Invalid operator";
        break;
    }

    if (evaluation === "NaN" || evaluation === "Infinity" || evaluation === "Invalid operator") {
      evaluation = "MATHEMATICAL ERROR";
    }
    return NextResponse.json(
      {
        result: evaluation,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        result: "ERROR",
      },
      { status: 200 }
    );
  }
}
