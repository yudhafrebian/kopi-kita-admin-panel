import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Power } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";

const ProfileAvatar = () => {
  const { admin, setAdmin } = useAuth();
  const [openSignOut, setOpenSignOut] = useState<boolean>(false);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer hover:bg-primary/20 rounded-lg">
        <div className="flex items-center gap-4 p-2">
          <Avatar>
            <AvatarFallback>{admin?.name.split(" ")[0][0]}</AvatarFallback>
          </Avatar>
          <div className="text-left md:inline hidden">
            <p className="text-sm">{admin?.name}</p>
            <p className="text-xs text-muted-foreground">{admin?.email}</p>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-58">
        <DropdownMenuItem className="gap-2 flex flex-col md:hidden">
          <div className="text-left">
            <p className="text-sm">{admin?.name}</p>
            <p className="text-xs text-muted-foreground">{admin?.email}</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setOpenSignOut(true)}>
          <Power className="text-destructive" />
          <span className="text-destructive">Keluar</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
      <Dialog open={openSignOut} onOpenChange={setOpenSignOut}>
        <DialogContent>
          <DialogHeader className="text-left">
            <DialogTitle>Keluar</DialogTitle>
            <DialogDescription>
              Apakah anda yakin ingin keluar?
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2 justify-end">
            <Button
              onClick={() => {
                setAdmin(null);
                window.localStorage.removeItem("token");
              }}
              variant={"destructive"}
            >
              Keluar
            </Button>
            <Button onClick={() => setOpenSignOut(false)} variant={"outline"}>
              Batal
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </DropdownMenu>
  );
};

export default ProfileAvatar;
