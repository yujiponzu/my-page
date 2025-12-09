import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "./page";

describe("Home page", () => {
  it("shows Japanese content by default", () => {
    render(<Home />);

    expect(document.title).toBe("研究者ホームページ | 植田 雄士");
    expect(screen.getByRole("heading", { level: 1, name: "植田 雄士" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "JA" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("link", { name: "メールを送る" })).toBeInTheDocument();
  });

  it("switches language to English when EN is selected", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await user.click(screen.getByRole("button", { name: "EN" }));

    expect(document.title).toBe("Research Portfolio | Yuji Ueda");
    expect(screen.getByRole("heading", { level: 1, name: "Yuji Ueda" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "EN" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("link", { name: "Email me" })).toBeInTheDocument();
  });

  it("shows peer review badge only for peer-reviewed publications", () => {
    render(<Home />);

    const reviewedHeading = screen.getByText("大規模言語モデルの評価指標設計");
    const reviewedItem = reviewedHeading.closest("li");
    if (!reviewedItem) {
      throw new Error("Peer-reviewed publication element not found");
    }
    expect(within(reviewedItem).getByText("査読有")).toBeInTheDocument();

    const nonReviewedHeading = screen.getByText("研究者向けインタラクティブ要約の検討");
    const nonReviewedItem = nonReviewedHeading.closest("li");
    if (!nonReviewedItem) {
      throw new Error("Non peer-reviewed publication element not found");
    }
    expect(within(nonReviewedItem).queryByText("査読有")).toBeNull();
  });
});
