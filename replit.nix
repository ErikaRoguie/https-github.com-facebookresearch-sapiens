{ pkgs }: {
	deps = with pkgs; [
		nodejs
		nodePackages.typescript-language-server
	];
}