import { motion } from "framer-motion";
import { Award, Trophy, Star, Crown } from "lucide-react";
import { TravelBadge } from "@/lib/social-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface BadgeShowcaseProps {
  badges: TravelBadge[];
  title?: string;
  showDescription?: boolean;
  layout?: 'grid' | 'horizontal';
}

const rarityColors = {
  common: 'bg-gray-100 text-gray-800 border-gray-300',
  rare: 'bg-blue-100 text-blue-800 border-blue-300',
  epic: 'bg-purple-100 text-purple-800 border-purple-300',
  legendary: 'bg-yellow-100 text-yellow-800 border-yellow-300'
};

const rarityIcons = {
  common: Star,
  rare: Award,
  epic: Trophy,
  legendary: Crown
};

export function BadgeShowcase({ 
  badges, 
  title = "Travel Badges", 
  showDescription = true,
  layout = 'grid'
}: BadgeShowcaseProps) {
  if (badges.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Award className="h-5 w-5" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Award className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">
              No badges earned yet. Start exploring to unlock achievements!
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const containerClass = layout === 'grid' 
    ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    : "flex gap-4 overflow-x-auto pb-2";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Award className="h-5 w-5" />
          {title}
          <Badge variant="secondary" className="ml-auto">
            {badges.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={containerClass}>
          {badges.map((badge, index) => {
            const RarityIcon = rarityIcons[badge.rarity];
            
            return (
              <TooltipProvider key={badge.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`relative p-4 rounded-lg border-2 cursor-pointer hover:shadow-md transition-shadow ${
                        layout === 'horizontal' ? 'min-w-[120px]' : ''
                      } ${rarityColors[badge.rarity]}`}
                    >
                      {/* Badge Icon */}
                      <div className="text-center mb-2">
                        <div className="text-3xl mb-1">{badge.icon}</div>
                        <div className="flex items-center justify-center gap-1">
                          <RarityIcon className="h-3 w-3" />
                          <span className="text-xs font-medium capitalize">
                            {badge.rarity}
                          </span>
                        </div>
                      </div>
                      
                      {/* Badge Name */}
                      <h4 className="font-semibold text-sm text-center mb-1 line-clamp-2">
                        {badge.name}
                      </h4>
                      
                      {/* Location */}
                      <p className="text-xs text-center text-muted-foreground line-clamp-1">
                        {badge.location}
                      </p>
                      
                      {/* Shine effect for legendary badges */}
                      {badge.rarity === 'legendary' && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          animate={{
                            x: ['-100%', '100%'],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 3,
                          }}
                        />
                      )}
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-xs">
                    <div className="space-y-2">
                      <div className="font-semibold">{badge.name}</div>
                      <div className="text-sm">{badge.description}</div>
                      <div className="text-xs text-muted-foreground">
                        <strong>Requirements:</strong> {badge.requirements}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <strong>Location:</strong> {badge.location}, {badge.governorate}
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </div>
        
        {showDescription && (
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              Earn badges by visiting locations and completing activities during your Egypt journey. 
              Share your achievements with the community!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}