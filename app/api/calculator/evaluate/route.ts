import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  let { equation } = body;

  if (isNaN(parseInt(equation[equation.length - 1]))) {
    if (equation.length <= 1) {
      equation = "0";
    }
    equation = equation.slice(0, -1);
  }

  try {
    let evaluation = eval(equation).toString();
    if (evaluation === "NaN" || evaluation === "Infinity") {
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
