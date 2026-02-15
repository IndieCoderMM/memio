import DevBanner from "@/components/blocks/dev-banner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DarkModeToggle from "@/components/ui/dark-mode-toggle";

export default function Profile() {
  return (
    <div className="bg-background relative min-h-screen">
      <DevBanner />
      <div className="mx-auto max-w-4xl px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-foreground mb-2 text-4xl font-bold">
            Profile Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your account and preferences
          </p>
        </div>

        {/* Profile Section */}
        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Profile Card */}
          <Card className="border-border bg-card md:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-primary/20 border-primary mx-auto flex h-24 w-24 items-center justify-center rounded-lg border-2">
                <span className="text-4xl">👤</span>
              </div>
              <div className="text-center">
                <h3 className="text-foreground font-bold">Alex User</h3>
                <p className="text-muted-foreground text-sm">
                  alex@example.com
                </p>
              </div>
              <Button
                className="bg-primary hover:bg-primary/90 w-full"
                size="sm"
              >
                Upload Photo
              </Button>
            </CardContent>
          </Card>

          {/* Account Info */}
          <Card className="border-border bg-card md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Account Information</CardTitle>
              <CardDescription>
                Update your basic account details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-foreground mb-2 block text-sm font-semibold">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Alex User"
                  className="bg-input border-border text-foreground placeholder-muted-foreground focus:ring-primary w-full rounded border px-3 py-2 focus:ring-2 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-foreground mb-2 block text-sm font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="alex@example.com"
                  className="bg-input border-border text-foreground placeholder-muted-foreground focus:ring-primary w-full rounded border px-3 py-2 focus:ring-2 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-foreground mb-2 block text-sm font-semibold">
                  Member Since
                </label>
                <input
                  type="text"
                  placeholder="January 8, 2024"
                  disabled
                  className="bg-muted border-border text-muted-foreground w-full cursor-not-allowed rounded border px-3 py-2"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preferences */}
        <Card className="border-border bg-card mb-6">
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>Customize your experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted/50 border-border flex items-center justify-between rounded border p-4">
              <div>
                <p className="text-foreground font-semibold">
                  Email Notifications
                </p>
                <p className="text-muted-foreground text-sm">
                  Get updates about achievements and milestones
                </p>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  defaultChecked
                  className="peer sr-only"
                />
                <div className="bg-border peer-focus:ring-primary peer bg-muted after:border-border peer-checked:bg-primary h-6 w-11 rounded-full peer-focus:ring-2 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
              </label>
            </div>

            <DarkModeToggle />

            <div className="bg-muted/50 border-border flex items-center justify-between rounded border p-4">
              <div>
                <p className="text-foreground font-semibold">Sound Effects</p>
                <p className="text-muted-foreground text-sm">
                  Play sounds during games
                </p>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input type="checkbox" className="peer sr-only" />
                <div className="bg-border peer-focus:ring-primary peer bg-muted after:border-border peer-checked:bg-primary h-6 w-11 rounded-full peer-focus:ring-2 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="border-border bg-card mb-6">
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>Manage your account security</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="outline"
              className="border-border text-foreground hover:bg-muted w-full justify-start bg-transparent"
            >
              Change Password
            </Button>
            <Button
              variant="outline"
              className="border-border text-foreground hover:bg-muted w-full justify-start bg-transparent"
            >
              Two-Factor Authentication
            </Button>
            <Button
              variant="outline"
              className="border-border text-foreground hover:bg-muted w-full justify-start bg-transparent"
            >
              Active Sessions
            </Button>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-destructive bg-destructive/5">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
            <CardDescription>Irreversible actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="outline"
              className="border-destructive/50 text-destructive hover:bg-destructive hover:text-destructive-foreground w-full justify-start bg-transparent"
            >
              Delete Account
            </Button>
            <p className="text-muted-foreground text-xs">
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="mt-8 flex gap-3">
          <Button className="bg-primary hover:bg-primary/90">
            Save Changes
          </Button>
          <Button
            variant="outline"
            className="border-border text-foreground hover:bg-muted bg-transparent"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
