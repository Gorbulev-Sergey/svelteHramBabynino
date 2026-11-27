interface IStore {
	ADMIN: {
		sidebar: {
			width?: number;
			height?: number;
			isOpen: boolean;
		};
	};
}

export let STORE = $state<IStore>({
	ADMIN: {
		sidebar: {
			width: 0,
			height: 100,
			isOpen: true
		}
	}
});
