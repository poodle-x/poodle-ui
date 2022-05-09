import { hookAct, renderHook } from "../../utils/test";
import useTabsState, {
	TabRegisterType,
	UseTabsStateOptions,
} from "../useTabsState";

describe("useTabsState", () => {
	it("should init", () => {
		const { result } = renderHook<
			UseTabsStateOptions,
			ReturnType<typeof useTabsState>
		>((props) => {
			return useTabsState({ ...props });
		});

		expect(result.current.value).toEqual(undefined);
		expect(result.current.listTab).toEqual([]);
		expect(result.current.listTabPanel).toEqual([]);
		expect(result.current.isUncontrolled).toEqual(true);
	});

	it("should return uncontrolled if send prop value", () => {
		const { result } = renderHook<
			UseTabsStateOptions,
			ReturnType<typeof useTabsState>
		>((props) => {
			return useTabsState({ ...{ propValue: "10" }, ...props });
		});

		expect(result.current.value).toEqual("10");

		expect(result.current.isUncontrolled).toEqual(false);
	});

	it("should register Tab", () => {
		const { result } = renderHook<
			UseTabsStateOptions,
			ReturnType<typeof useTabsState>
		>((props) => {
			return useTabsState({ ...props });
		});
		expect(result.current.listTab).toEqual([]);
		hookAct(() => {
			result.current.handleRegister(TabRegisterType.TAB, "val0", "0", 0);
			result.current.handleRegister(TabRegisterType.TAB, "val1", "1", 1);
		});
		expect(result.current.listTab).toEqual([
			["val0", "0"],
			["val1", "1"],
		]);
		hookAct(() => {
			result.current.handleRegister(TabRegisterType.TAB, "val2", "2", 0);
		});
		expect(result.current.listTab).toEqual([
			["val2", "2"],
			["val0", "0"],
			["val1", "1"],
		]);
		hookAct(() => {
			result.current.handleRegister(TabRegisterType.TAB, "val3", "3", 100);
		});
		expect(result.current.listTab).toEqual([
			["val2", "2"],
			["val0", "0"],
			["val1", "1"],
			["val3", "3"],
		]);
	});

	it("should unregister Tab", () => {
		const { result } = renderHook<
			UseTabsStateOptions,
			ReturnType<typeof useTabsState>
		>((props) => {
			return useTabsState({ ...props });
		});
		expect(result.current.listTab).toEqual([]);
		hookAct(() => {
			result.current.handleRegister(TabRegisterType.TAB, "val0", "0", 0);
			result.current.handleRegister(TabRegisterType.TAB, "val1", "1", 1);
			result.current.handleRegister(TabRegisterType.TAB, "val2", "2", 2);
		});
		expect(result.current.listTab).toEqual([
			["val0", "0"],
			["val1", "1"],
			["val2", "2"],
		]);
		hookAct(() => {
			result.current.handleUnregister(TabRegisterType.TAB, "val2", "1");
			result.current.handleUnregister(TabRegisterType.TAB, "val3", "0");
		});
		expect(result.current.listTab).toEqual([
			["val0", "0"],
			["val1", "1"],
		]);
	});

	it("should register TabPanel", () => {
		const { result } = renderHook<
			UseTabsStateOptions,
			ReturnType<typeof useTabsState>
		>((props) => {
			return useTabsState({ ...props });
		});
		expect(result.current.listTabPanel).toEqual([]);
		hookAct(() => {
			result.current.handleRegister(TabRegisterType.PANEL, "val0", "0", 0);
			result.current.handleRegister(TabRegisterType.PANEL, "val1", "1", 1);
		});
		expect(result.current.listTabPanel).toEqual([
			["val0", "0"],
			["val1", "1"],
		]);
		hookAct(() => {
			result.current.handleRegister(TabRegisterType.PANEL, "val2", "2", 0);
		});
		expect(result.current.listTabPanel).toEqual([
			["val2", "2"],
			["val0", "0"],
			["val1", "1"],
		]);
		hookAct(() => {
			result.current.handleRegister(TabRegisterType.PANEL, "val3", "3", 100);
		});
		expect(result.current.listTabPanel).toEqual([
			["val2", "2"],
			["val0", "0"],
			["val1", "1"],
			["val3", "3"],
		]);
	});

	it("should unregister TabPanel", () => {
		const { result } = renderHook<
			UseTabsStateOptions,
			ReturnType<typeof useTabsState>
		>((props) => {
			return useTabsState({ ...props });
		});
		expect(result.current.listTabPanel).toEqual([]);
		hookAct(() => {
			result.current.handleRegister(TabRegisterType.PANEL, "val0", "0", 0);
			result.current.handleRegister(TabRegisterType.PANEL, "val1", "1", 1);
			result.current.handleRegister(TabRegisterType.PANEL, "val2", "2", 2);
		});
		expect(result.current.listTabPanel).toEqual([
			["val0", "0"],
			["val1", "1"],
			["val2", "2"],
		]);
		hookAct(() => {
			result.current.handleUnregister(TabRegisterType.PANEL, "val2", "1");
			result.current.handleUnregister(TabRegisterType.PANEL, "val3", "0");
		});
		expect(result.current.listTabPanel).toEqual([
			["val0", "0"],
			["val1", "1"],
		]);
	});
});
