{ pkgs ? import ./etc/nixpkgs.nix
}:
let
  inherit (pkgs) mkShell texlive;
in mkShell {
  buildInputs = with pkgs; [
    entr
    deno
  ];
}
