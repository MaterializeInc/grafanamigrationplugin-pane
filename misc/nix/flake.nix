{
  description = "A development shell for mzcloud development";

  outputs = flake-inputs @ {
    self,
    nixpkgs-current,
    nixpkgs-previous,
    flake-utils,
    fenix,
    ...
  }:
    flake-utils.lib.eachDefaultSystem (
      system: let
        pkgs = import nixpkgs-current {
          inherit system;
          overlays = [fenix.overlays.default];
        };
        previousPkgs = nixpkgs-previous.legacyPackages.${system};
      in {
        formatter = pkgs.alejandra;
        devShell = pkgs.mkShell rec {
          nativeBuildInputs = with pkgs;
            [
              nodePackages_latest.npm
              nodePackages_latest.yarn
              nodePackages_latest.webpack
              shellcheck
              nodejs
              nodePackages_latest.eslint
              nodePackages_latest.eslint_d
            ]
            ++ (
              pkgs.lib.optionals stdenv.isDarwin
              (with pkgs.darwin.apple_sdk; [
                frameworks.Security
                frameworks.CoreServices
                frameworks.CoreFoundation
                frameworks.Foundation
                frameworks.AppKit
              ])
            )
            ++ (pkgs.lib.optionals (!stdenv.isDarwin) [
              gcc11
            ]);

          LD_LIBRARY_PATH = pkgs.lib.makeLibraryPath [
            pkgs.stdenv.cc.cc.lib
          ];
        };
      }
    );

  inputs = {
    nixpkgs-current.url = "github:nixos/nixpkgs/release-22.11";
    nixpkgs-previous.url = "github:nixos/nixpkgs/release-22.05";
    flake-utils.url = "github:numtide/flake-utils";
  };
}
