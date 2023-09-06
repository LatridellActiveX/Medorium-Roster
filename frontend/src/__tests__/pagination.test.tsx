import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Pagination from "../ui/pagination";
import userEvent from "@testing-library/user-event";

const fakeItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

describe("Pagination", () => {
  const setItems = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Tests with static pagination", () => {
    beforeEach(() => {
      vi.clearAllMocks();

      render(
        <Pagination items={fakeItems} itemsPerPage={3} setItems={setItems} />
      );
    });

    it("checks if the page numbers are displayed correctly", () => {
      expect(screen.getByLabelText("Pagination").childNodes.length - 2).toBe(
        Math.ceil(fakeItems.length / 3)
      );
    });
    it("expects next page button to be clicked", () => {
      userEvent.click(screen.getByLabelText("Next page"));

      expect(setItems).toHaveBeenCalledOnce();
    });
  });

  //tests with specific props here...
});
